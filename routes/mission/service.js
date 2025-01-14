import Mission from "../../models/Mssion.js";
import moment from "moment-timezone";

//한국 시간으로 저장해놓기
const timezone = "Asia/Seoul";

//전체 미션 목록 조회하기
const getMission = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; //요청된 페이지(기본값: 1)
    const limit = parseInt(req.query.limit) || 10; //요청된 limit (기본값: 10);
    const skip = (page - 1) * limit; //페이지네이션을 위한 skip값 계산

    //missions collection에서 skip값 만큼 건너뛰고 limit개수 만큼 데이터 불러오기
    const missions = await Mission.find().skip(skip).limit(limit);

    //총 미션수, 페이지 수 계산
    const totalMissions = await Mission.countDocuments(); //collection에 있는 전체 데이터 개수 불러오기
    const totalPages = Math.ceil(totalMissions / limit);

    //요청 성공 시 응답 포맷 설정
    const response = {
      status: 200,
      missionList: missions.map((mission) => ({
        id: mission._id,
        missionTitle: mission.missionTitle,
        missionPoint: mission.missionPoint,
        isComplete: mission.isComplete,
        createdAt: mission.createdAt,
        updatedAt: mission.updatedAt,
      })),
      totalMissions,
      totalPages,
      page,
      limit,
    };

    res.send(response);
  } catch (e) {
    res.send({ message: e });
  }
};

//미션 상세 조회하기
const getMissionById = async (req, res) => {
  try {
    const id = req.params.id; //파라미터로 미션 id받기
    const mission = await Mission.findById(id); //id일치하는 미션 찾기
    res.send(mission);
  } catch (e) {
    res.send({ message: e });
  }
};

//미션 생성하기
const createMission = async (req, res) => {
  try {
    //현재 시간 KST(한국 시간)로 포맷팅
    const date = moment().tz(timezone).format("YYYY-MM-DD HH:mm:ss");

    const { missionTitle, missionPoint } = req.body;
    const newMission = await Mission.create({
      missionTitle,
      missionPoint,
      createdAt: date,
      updatedAt: date,
    });
    res.status(201).send(newMission);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e });
  }
};

//id로 선택한 미션 완료 여부 토글 업데이트
const updateMissionComplete = async (req, res) => {
  try {
    //현재 시간 KST(한국 시간)로 포맷팅해서 updatedAt 시간 수정하기
    const date = moment().tz(timezone).format("YYYY-MM-DD HH:mm:ss");

    const id = req.params.id;
    const mission = await Mission.findById(id);

    //id 일치하는 mission이 있을 때 complete 상태 토글
    if (mission) {
      mission.isComplete = !mission.isComplete;
      mission.updatedAt = date;
    }

    await mission.save(); //변경된 데이터 저장
    res.send(mission);
  } catch (e) {
    res.send({ message: e });
  }
};

//id로 선택한 미션 내용 수정 업데이트
const updateMissionContent = async (req, res) => {
  try {
    //현재 시간 KST(한국 시간)로 포맷팅해서 updatedAt 시간 수정하기
    const date = moment().tz(timezone).format("YYYY-MM-DD HH:mm:ss");

    const id = req.params.id;
    const mission = await Mission.findById(id);

    //id 일치하는 mission이 있을 때 body에서 일치하는 key의 밸류만 수정해서 저장.
    if (mission) {
      Object.keys(req.body).forEach((key) => {
        mission[key] = req.body[key];
      });
      mission.updatedAt = date;
    }

    await mission.save(); //변경된 데이터 저장
    res.send(mission);
  } catch (e) {
    res.send({ message: e });
  }
};

//미션 삭제하기
const deleteMission = async (req, res) => {
  try {
    const id = req.params.id;
    const mission = await Mission.findByIdAndDelete(id);
    if (!mission) res.status(404).send("일치하는 id가 없습니다.");

    res.status(202).send({ message: "삭제가 완료되었습니다." });
  } catch (e) {
    res.status(500).send("서버 에러입니다.");
  }
};

const service = {
  getMission,
  getMissionById,
  createMission,
  updateMissionComplete,
  updateMissionContent,
  deleteMission,
};

export default service;
