import { Space, Skeleton } from "antd";

function Placeholder() {

    //Generate random int between 1 and 5
    const placeholderCount = Math.floor(Math.random() * 5) + 1;
    const placeholders = [];

    for (let i = 0; i < placeholderCount; i++) {
        placeholders.push(
            <Space key={i} size="middle">
                <Skeleton.Avatar active={true} size={"small"}  /> 
                <Skeleton.Input active={true} size={"small"}  />
            </Space>
        );
    }

    return (
        <Space direction="vertical">
            {placeholders}
        </Space>
    );
}

export default Placeholder;