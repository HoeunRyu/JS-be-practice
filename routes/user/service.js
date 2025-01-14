import User from "../../models/User.js";
import moment from "moment-timezone";

//한국 시간으로 저장해놓기
const timezone = "Asia/Seoul";

//이후 업데이트할 때 아래 코드 넣어주자
//현재 시간 KST(한국 시간)로 포맷팅
// const date = moment().tz(timezone).format("YYYY-MM-DD HH:mm:ss");

//TODO: 유저데이터는 처음 입력받은 데이터로 토큰 생성하고 불러오는걸로 수정하기
const getUser = async (req, res) => {
  // const { email } = req.body; //클라이언트에서 보낸 이메일 받기
  // try {
  //   const user = await User.findOne({ email }); //user collection에서 이메일로 찾은 유저 정보 담기
  //   if (!user) res.status(404).json({ message: "User not found" });
  //   res.status(200).send(user);
  // } catch (e) {
  //   res.send({ message: e });
  // }
};

const createUser = async (req, res) => {};

const updateUser = async (req, res) => {};

const deleteUser = async (req, res) => {};

const service = {
  getUser,
  createUser,
  updateUser,
  deleteUser,
};

export default service;
