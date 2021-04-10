import api from "../../classes/NextApiRoute";
import firebase from "../../firebase";
import { validateContactForm } from "../../utils";

const apiRoute = api();

apiRoute.post(async (req, res) => {
  const { body } = req;
  const errors = validateContactForm(body);

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  const collectionRef = firebase.firestore().collection("blog-contact");
  const docRef = await collectionRef.add(body);
  const docSnapshot = await docRef.get();

  return res.status(202).json({ id: docSnapshot.id, ...docSnapshot.data() });
});

export default apiRoute.handler;
