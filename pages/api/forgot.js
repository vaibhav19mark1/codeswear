import Forgot from "@/models/Forgot";
import User from "@/models/User";

export default async function handler(req, res) {
  if (req.body.sendMail) {
    let token = "wouuwnfuefuefboqdpoq151";
    let forgot = new Forgot({
      email: req.bidy.email,
      token: token,
    });
    let email = `We have sent you this email in response to your request to reset your password on CodesWear.com.
                To reset your password please follow the link below:
        <a href="http://codeswear.com/forgot?token=${token}">Click here to reset your password</a>
        We recommend that you keep your password secure and not share it with anyone.If you feel your password has been compromised, you can change it by going to your My Account Page.`;
  }
  else{

  }

  res.status(200).json({ name: "John Doe" });
}
