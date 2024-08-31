import { Footer } from "antd/es/layout/layout";
import { Input } from "../../components/inputs";
import { Col, Row, Space, Typography } from "antd";
import logo from "../../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { PrimaryButton } from "../../components/buttons";
import { Divider } from "../../components/divider";
import { FacebookFilled, InstagramFilled, TwitterCircleFilled } from "@ant-design/icons";

export default function MyFooter() {
  const navigate = useNavigate();
  const { Text, Title } = Typography;

  return (
    <Footer className="text-white bg-black text-center px-0">
      <Row className="pb-[5%] px-[5%] flex justify-between">
        <Col span={5} className="flex flex-col items-center">
          <img
            alt=""
            className="px-10 py-1 hover:cursor-pointer"
            onClick={() => navigate("/")}
            src={logo}
          />
            <Text className="text-white mb-[4%]">Leave an email to recieve the latest news</Text>
            <Space.Compact block>
              <Input placeholder="Email" className="border-none" colorBgContainer="#4f4f4f" colorTextPlaceholder="#a4a4a4"/>
                <PrimaryButton text="Submit"/>
            </Space.Compact>
        </Col>
        <Col className="flex flex-col justify-evenly text-left">
        <Title level={4} style={{color:"white"}}>About LOLOCA</Title>
        <Link to="/" className="text-white">About us</Link>
        <Link to="/" className="text-white">LOLOCA Blog</Link>
        <Link to="/" className="text-white">Job Oppurtunity</Link>
        <Link to="/" className="text-white">LOLOCA's gift codes</Link>
        </Col>
        <Col className="flex flex-col justify-evenly text-left">
        <Title level={4} style={{color:"white"}}>Associate</Title>
        <Link to="/" className="text-white">Supplier registration</Link>
        <Link to="/" className="text-white">Register partners</Link>
        <Link to="/" className="text-white">Program for agents</Link>
        </Col>
        <Col className="flex flex-col justify-evenly text-left">
        <Title level={4} style={{color:"white"}}>Term of Usage</Title>
        <Link to="/" className="text-white">Privacy Usage</Link>
        <Link to="/" className="text-white">Cookie Policies</Link>
        <Link to="/" className="text-white">Policies and Guidelines</Link>
        <Link to="/" className="text-white">Software Bug Reward Policies</Link>
        </Col>
      </Row>
      <Divider colorSplit="white"/>
      <Row className="flex justify-between px-[5%]">
        <Text className="text-white">2024-2025 LOLOCA. All Rights Reserved</Text>
        <div className="flex justify-evenly w-[10%]">
          <Link to='/' className="text-white">
            <FacebookFilled className="text-[2rem] hover:text-blue-500 hover:scale-125 transition-transform duration-300" />
          </Link>
          <Link to='/' className="text-white">
            <TwitterCircleFilled className="text-[2rem] hover:text-blue-400 hover:scale-125 transition-transform duration-300" />
          </Link>
          <Link to='/' className="text-white">
            <InstagramFilled className="text-[2rem] hover:text-pink-500 hover:scale-125 transition-transform duration-300" />
          </Link>
        </div>
      </Row>
    </Footer>
  );
}
