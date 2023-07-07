import React from "react";

const Container = (props) => {
    return (
        <div
            className={`container w-full px-8 pb-8 lg:pt-8 mx-auto xl:px-0 ${props.className ? props.className : ""
                }`}>
            {props.children}
        </div>
    );
}

export default Container;