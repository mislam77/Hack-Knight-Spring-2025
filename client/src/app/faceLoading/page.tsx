import React from "react";
import Image from "next/image";
import Loading from "../assets/loading.gif";

function facerec() {
    return (
        <div className="mx-auto max-w-[400px] mt-[230px]">
            <div className="">
                <div>
                    <Image 
                        src={Loading} 
                        alt="Loading Screen for face recognition" 
                        className="pointer-events-none select-none"
                        draggable={false}
                    />
                </div>
                <h1 className="text-center font-medium text-3xl pointer-events-none select-none" draggable="false">
                    Don't move, scanning face......
                </h1>
            </div>
        </div>
    );
}

export default facerec;