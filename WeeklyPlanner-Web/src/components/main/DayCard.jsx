import { Context } from "../../App.jsx"
import { Space, Skeleton } from "antd";
import { useContext } from "react";

function DayCard({ date }) {

    const { tasksLoading } = useContext(Context);

    //Placeholder content for card when fetching tasks from database
    const skeleton = (
        <Space direction="vertical">
            <Space>
                <Skeleton.Avatar active={true} size={"small"}  /> 
                <Skeleton.Input active={true} size={"small"}  />
            </Space>
            <Space>
                <Skeleton.Avatar active={true} size={"small"}  /> 
                <Skeleton.Input active={true} size={"small"}  />
            </Space>
            <Space>
                <Skeleton.Avatar active={true} size={"small"}  /> 
                <Skeleton.Input active={true} size={"small"}  />
            </Space>
        </Space>
    );

    return (
        <div className="card">
            <div className="card-body">
                <p className="title">{date}</p>
                { tasksLoading && skeleton }
            </div>
        </div>
    );
}

export default DayCard;