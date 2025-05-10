import express from "express";
import QRCode from 'qrcode';

const router=express.Router();

router.post('/generate',async (req,res)=>{
    const url=req.body.url;
    if(!url){
        return res.status(400).json({error:'URL is required'});
    }

      try {
    const qrDataUrl = await QRCode.toDataURL(url);
    res.json({ src: qrDataUrl });
  } catch (err) {
    res.status(500).json({ error: 'QR code generation failed' });
  }
});

export default router;