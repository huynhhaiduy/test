import "./DashBoard.scss";
import Question from "./../../User/Question";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getOverview } from "../../../services/apiService";
import { useState, useEffect } from "react";
import { useTranslation, Trans } from "react-i18next";

const DashBoard = (props) => {
  const [dataOverview, setDataOverview] = useState([]);
  const [dataChart, setDataChart] = useState([]);

  useEffect(() => {
    fetchDataOverview();
  }, []);

  const fetchDataOverview = async () => {
    let res = await getOverview();
    if (res && res.EC === 0) {
      setDataOverview(res.DT);
      // process chart data
      let Qz = 0,
        Qs = 0,
        As = 0;

      Qz = res?.DT?.others?.countQuiz ?? 0;
      Qs = res?.DT?.others?.countQuestions ?? 0;
      As = res?.DT?.others?.countAnswers ?? 0;

      const data = [
        {
          name: "Quizzes",
          Total: Qz,
          fill: "#8884d8",
        },
        {
          name: "Questions",
          Total: Qs,
          fill: "#82ca9d",
        },
        {
          name: "Answers",
          Total: As,
          fill: "#fcb12a",
        },
      ];

      setDataChart(data);
    }
  };

  const { t } = useTranslation();

  return (
    <div className="dashboard-container">
      <div className="title">{t("admin.dashboard.title")}</div>

      <div className="content">
        <div className="c-left">
          <div className="child">
            <span className="text-1">{t("admin.dashboard.total-user")}</span>
            <span className="text-2">
              {dataOverview &&
              dataOverview.users &&
              dataOverview.users.total ? (
                <>{dataOverview.users.total}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
          <div className="child">
            <span className="text-1">{t("admin.dashboard.total-quiz")}</span>
            <span className="text-2">
              {dataOverview &&
              dataOverview.others &&
              dataOverview.others.countQuiz ? (
                <>{dataOverview.others.countQuiz}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
          <div className="child">
            <span className="text-1">
              {t("admin.dashboard.total-question")}
            </span>
            <span className="text-2">
              {dataOverview &&
              dataOverview.others &&
              dataOverview.others.countQuestions ? (
                <>{dataOverview.others.countQuestions}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
          <div className="child">
            <span className="text-1">{t("admin.dashboard.total-answer")}</span>
            <span className="text-2">
              {dataOverview &&
              dataOverview.others &&
              dataOverview.others.countAnswers ? (
                <>{dataOverview.others.countAnswers}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
        </div>

        <div className="c-right">
          <ResponsiveContainer width="95%" height={"100%"}>
            <BarChart data={dataChart}>
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              {/* <Legend /> */}
              <Bar dataKey="Total" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
