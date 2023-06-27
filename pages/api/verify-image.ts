import { v4 as uuidv4 } from 'uuid'
import { NextApiRequest, NextApiResponse } from 'next'
import FormData from 'form-data'
import axios from 'axios'


export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb'
        }
    }
}

const handlerImage = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { bytes, fileName, contentType } = JSON.parse(req.body)
        const pinata_api_key = process.env.PINATA_API_KEY
        const pinata_secret_api_key = process.env.PINATA_SECRET_API_KEY
        const pinata_url = 'https://api.pinata.cloud/pinning/pinFileToIPFS'

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
            pinata_url,
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
