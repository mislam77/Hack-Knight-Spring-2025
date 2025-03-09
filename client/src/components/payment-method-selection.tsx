import React from "react";
import { Focus } from "lucide-react";

const PaymentMethodSelection: React.FC<{ handlePayment: () => void }> = ({
  handlePayment,
}) => {
  return (
    <div className="pb-10">
      <div className="flex gap-5 mt-5">
        <button className="h-[100px] w-[100px] px-4 py-2 flex flex-col justify-center gap-1 hover:bg-gray-50 hover:cursor-pointer bg-white rounded-lg shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.75"
            className="h-8 w-8 mx-auto"
          >
            <rect width="20" height="14" x="2" y="5" rx="2"></rect>
            <path d="M2 10h20"></path>
          </svg>
          <p className="text-center font-semibold text-[16px]">Card</p>
        </button>
        <button className="h-[100px] w-[100px] px-4 py-2 flex flex-col justify-center gap-1 bg-white hover:bg-gray-50 hover:cursor-pointer rounded-lg shadow-sm">
          <svg role="img" viewBox="0 0 24 24" className="h-6 w-6 mx-auto">
            <path
              d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z"
              fill="currentColor"
            ></path>
          </svg>
          <p className="text-center font-semibold text-[16px]">Paypal</p>
        </button>
        <button className="h-[100px] w-[100px] px-4 py-2 flex flex-col justify-center gap-1 bg-white hover:bg-gray-50 hover:cursor-pointer rounded-lg shadow-sm">
          <svg role="img" viewBox="0 0 24 24" className="h-7 w-7 mx-auto">
            <path
              d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
              fill="currentColor"
            ></path>
          </svg>
          <p className="text-center font-semibold text-[16px]">Apple</p>
        </button>
      </div>
      <div className="flex items-center my-4">
        <div className="flex-1 border-t border-gray-300"></div>
        <span className="px-3 text-sm text-gray-500">or</span>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>
      <div>
        <button
          onClick={handlePayment}
          type="button"
          className="relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white btn-color hover:cursor-pointer"
        >
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            <Focus strokeWidth={1.75} size={22} />
          </span>
          Pay with Invis.io
        </button>
      </div>
    </div>
  );
};

export default PaymentMethodSelection;
