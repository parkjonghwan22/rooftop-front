import { v4 as uuidv4 } from 'uuid'
import { NextApiRequest, NextApiResponse } from 'next'
import FormData from 'form-data'
import axios from 'axios'
import config from '../../config'

const handlerImage = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { bytes, fileName, contentType } = JSON.parse(req.body)
        const pinata_api_key = config.PINATA_API_KEY
        const pinata_secret_api_key = config.PINATA_SECRET_API_KEY

        if (!bytes || !fileName || !contentType) {
            return res.status(422).send({ message: 'Image data are missing' })
        }

        const buffer = Buffer.from([...bytes])
        const formData = new FormData()

        formData.append('file', buffer, {
            contentType,
            filename: fileName + '-' + uuidv4(),
        })
        const fileRes = await axios.post(
            'https://api.pinata.cloud/pinning/pinFileToIPFS',
            formData,
            {
                maxBodyLength: Infinity,
                headers: {
                    'Content-Type': `multipart/form-data; boundary=${formData.getBoundary()}`,
                    pinata_api_key,
                    pinata_secret_api_key,
                },
            }
        )
        console.log('Verify Success!')
        return res.status(200).send(fileRes.data)
    } else {
        return res.status(422).send({ message: 'Invalid endpoint' })
    }
}

export default handlerImage
