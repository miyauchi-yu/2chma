import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'

type Data = {
    sites: string[]
}

const SiteInfo = (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const fileContents = fs.readFileSync('./public/data/sites', 'utf8')
    const siteArray = fileContents.split('\n')
    res.status(200).json({ sites: siteArray })
}

export default SiteInfo
