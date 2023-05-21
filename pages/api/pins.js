// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import pins from "../../data/pincodes.json"
export default function handler(req, res) {

    res.status(200).send(pins)
  }
  