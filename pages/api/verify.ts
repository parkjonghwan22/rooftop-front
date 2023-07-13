import { v4 as uuidv4 } from 'uuid'
import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import config from '../../config'

const uploadImage = async (req: NextApiRequest, res: NextApiResponse) => {
    const pinata_api_key = config.PINATA_API_KEY
    const pinata_secret_api_key = config.PINATA_SECRET_API_KEY


    if (req.method === 'POST') {
        try {
            const { name, description, image } = JSON.parse(req.body)
            console.log('jsonRes before name ::', name)
            console.log('jsonRes before image ::', image)
            console.log('jsonRes before descriptioin ::', description)

            if (!name || !image || !description) {
                return res.status(422).send({ message: 'Missing parameters' })
            }

            const jsonRes = await axios.post(
                'https://api.pinata.cloud/pinning/pinJSONToIPFS',
                {
                    pinataMetadata: {
                        name: uuidv4(),
                    },
                    pinataContent: {
                        name,
                        description,
                        ipfs: `ipfs://${image}`,
                    },
                },
                {
                    headers: {
                        pinata_api_key,
                        pinata_secret_api_key,
                    },
                }
            )
            console.log('jsonRes after ::', jsonRes)
            return res.status(200).send(jsonRes.data)
        } catch {
            return res.status(422).send({ message: 'Cannot create JSON' })
        }
    }
}

export default uploadImage
