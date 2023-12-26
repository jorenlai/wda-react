import { message } from "antd";
import { CloseOutlined } from "@ant-design/icons";

message.config({ duration: 3 });

const info = (props) => {
    const key = Date.now();
    message.info({
        content: (
            <>
                <div className="message">{props.message}</div>
                <CloseOutlined
                    onClick={() => {
                        message.destroy(key);
                    }}
                />
            </>
        ),
        className: "info",
        key,
        ...props
    });
};

const success = (props) => {
    const key = Date.now();
    message.success({
        content: (
            <>
                <div className="message">{props.message}</div>
                <CloseOutlined
                    onClick={() => {
                        message.destroy(key);
                    }}
                />
            </>
        ),
        className: "success",
        key,
        ...props
    });
};

const warning = (props) => {
    const key = Date.now();
    message.warning({
        content: (
            <>
                <div className="message">{props.message}</div>
                <CloseOutlined
                    onClick={() => {
                        message.destroy(key);
                    }}
                />
            </>
        ),
        className: "warning",
        key,
        ...props
    });
};

const error = (props) => {
    const key = Date.now();
    message.error({
        content: (
            <>
                <div className="message">{props.message}</div>
                <CloseOutlined
                    onClick={() => {
                        message.destroy(key);
                    }}
                />
            </>
        ),
        className: "error",
        key,
        ...props
    });
};

const msg = {
    info,
    success,
    warning,
    error
};

export default msg;
