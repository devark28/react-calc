import React from "react";

function Divide(props: React.SVGProps<SVGSVGElement>) {

    return <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16" {...props}
    >
        <g strokeWidth="0"/>
        <g strokeLinecap="round" strokeLinejoin="round"/>
        <g>
            <g>
                <path

                    d="M16,9c0,0.553-0.447,1-1,1H1c-0.553,0-1-0.447-1-1V7c0-0.552,0.447-1,1-1h14c0.553,0,1,0.448,1,1V9z "/>
                <path
                    d="M7,4C6.447,4,6,3.553,6,3V1c0-0.553,0.447-1,1-1h2c0.553,0,1,0.447,1,1v2c0,0.553-0.447,1-1,1H7z"/>
                <path
                    d="M7,16c-0.553,0-1-0.447-1-1v-2c0-0.553,0.447-1,1-1h2c0.553,0,1,0.447,1,1v2c0,0.553-0.447,1-1,1H7z "/>
            </g>
        </g>
    </svg>;
}

export default Divide;
