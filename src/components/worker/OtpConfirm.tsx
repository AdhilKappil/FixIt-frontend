import { CSSProperties, useState } from 'react';
import OtpInput from 'react-otp-input';


function OtpConfirm() {

    const inputStyles: CSSProperties = {
        width: "2.8rem",
        fontSize: "1.4rem",
        fontWeight: "600",
        height: "2.8rem",
        borderRadius: "7px",
        boxShadow: " rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        backgroundColor: "#F7F7F7",
        border: "1px solid #C7C8CC",
        textAlign:"center"
        // borderColor: ${error ? "#FF204E" : '#C7C8CC'},
        // marginBottom: ${error ? "0px" : '12px'}
    };
    const [otp, setOtp] = useState('');
    
    return (
     <div className='flex justify-center mt-10'>
        <div className='w-full bg-tertiary shadow-md rounded-xl'>
        <div className='font-Sans text-2xl my-5 flex justify-center'>OTP</div>
      <div className='flex justify-center'>
      <hr className='border w-4/5'/>
      </div>
      <div className='font-Sans text-3xl flex justify-center mt-5'>Enter OTP</div>
      <div className='mt-5 flex justify-center'>
      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={6}
        renderSeparator={<span> &nbsp; </span>}
        renderInput={(props) => <input {...props} style={inputStyles} />}
      />
      </div>
      <div className='flex justify-center mt-5'>Resend OTP in 50 seconds</div>
      <div className='flex justify-center my-5'>
        <button className='bg-primary p-2 w-28 text-white rounded'>Verify</button>
      </div>
      <div className='flex justify-center h-16'>
      <hr className='border w-4/5'/>
      </div>
        </div>
     </div>
    );
}

export default OtpConfirm