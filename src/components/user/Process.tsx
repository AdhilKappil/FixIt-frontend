import React from 'react';

interface Step {
  title: string;
  image: string;
  alt: string;
  round? : boolean
}

const steps: Step[] = [
  {
    title: "Booking Online",
    image: "/booking (1) 1.png",
    alt: "Booking Online Image"
  },
  {
    title: "Confirmation",
    image: "Frame.png",
    alt: "Confirmation Image"
  },
  {
    title: "Estimate Details",
    image: "image 73.png",
    alt: "Estimate Details Image"
  },
  {
    title: "Complete Work",
    image: "/Vector 153 (Stroke).png",
    alt: "Complete Work",
    round:true
  }
];

const Process: React.FC = () => {
  return (
    <div className="flex justify-center">
      <div className="w-3/4" style={{ height: '500px' }}>
        <div className="flex justify-center mt-14">
          <p className="text-primary font-bold text-xl lg:text-3xl">We Follow The Process</p>
        </div>
        <div className="grid mt-14 text-center justify-between sm:grid-cols-2 lg:grid-cols-3 xl:flex">
          {steps.map((step, index) => (
            <div key={index}>
              <div className="h-36 w-36 ml-14 lg:ml-0 lg:w-52 lg:h-52 rounded-full flex items-center justify-center" style={{ background: '#FAE084' }}>
                {step.round ?<div className="h-20 w-20 bg-primary rounded-full flex justify-center items-center">
                <img src="/Vector 153 (Stroke).png" alt=""/>
                </div> :<img src={step.image} alt={step.alt} /> }
              </div>
              <div className="mt-10 text-base text-primary font-bold lg:text-xl">{step.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};  

export default Process;
