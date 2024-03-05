import React from 'react';
import {TailSpin} from "react-loader-spinner";

const Loader = ({top, show = true, width='60', height='60'}) => {
        return (
            <div className={`h-full w-full flex ${top ? '' : 'items-center'} justify-center z-[1000] ${show ? '' : 'hidden'}`}>
                <TailSpin
                    height={height}
                    width={width}
                    color="#FF644C"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
            </div>
        );
};

export default Loader;