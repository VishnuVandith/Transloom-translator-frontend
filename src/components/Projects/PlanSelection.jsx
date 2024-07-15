import { useState } from "react";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";

const PlanSelection = () => {
  const plans = [
    {
      name: "Free",
      price: 0,
      description: "1 translated language - 2,000 words",
    },
    {
      name: "Starter",
      price: 15,
      description: "1 translated language - 10,000 words",
    },
    {
      name: "Business",
      price: 29,
      description: "3 translated languages - 50,000 words",
    },
    {
      name: "Pro",
      price: 79,
      description: "5 translated languages - 200,000 words",
    },
    {
      name: "Advanced",
      price: 299,
      description: "10 translated languages - 1,000,000 words",
    },
    {
      name: "Extended",
      price: 699,
      description: "20 translated languages - 5,000,000 words",
    },
    {
      name: "Enterprise",
      price: null,
      description: "Custom amount of languages & words",
    },
  ];

  const [selectedPlan, setSelectedPlan] = useState(plans[3]); // Default to Pro plan

  const handlePlanSelection = (plan) => {
    setSelectedPlan(plan);
  };

  return (
    <>
      <div
        className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8"
        style={{ fontFamily: "Poppins" }}
      >
        <h1
          className="text-2xl sm:text-3xl font-bold mb-6"
          style={{ fontFamily: "Poppins", fontSize: "24px" }}
        >
          Change your plan
        </h1>

        <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="col-span-1 sm:col-span-2 lg:col-span-1">
              <h2 className="text-xl font-semibold mb-2">Plan selection</h2>
              <p className="text-sm text-gray-600">
                See more details about{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  features and usage limits
                </a>
                .
              </p>
            </div>
            <div className="col-span-1 sm:col-span-2 lg:col-span-2 grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">{selectedPlan.name} MONTHLY</p>
                <p>VAT (0%)</p>
                <p className="font-bold mt-2">Total</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">
                  €{selectedPlan.price?.toFixed(2) || "Custom"}
                </p>
                <p>€0.00</p>
                <p className="font-bold mt-2">
                  €{selectedPlan.price?.toFixed(2) || "Custom"}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            {plans.map((plan, index) => (
              <div
                key={index}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center py-4 border-t"
              >
                <div>
                  <p className="font-semibold">{plan.name}</p>
                  <p className="text-sm text-gray-600">
                    €{plan.price?.toFixed(2) || "Custom"}
                  </p>
                </div>
                <div className="flex items-center">
                  <p className="text-sm text-gray-600 mr-2">
                    {plan.description}
                  </p>
                  <QuestionMarkCircleIcon className="h-5 w-5 text-gray-400 flex-shrink-0" />
                </div>
                <div className="flex justify-end">
                  {plan.name === "Enterprise" ? (
                    <a href="#" className="text-blue-600 hover:underline">
                      Contact us
                    </a>
                  ) : (
                    <button
                      onClick={() => handlePlanSelection(plan)}
                      className={`px-4 py-2 rounded w-full sm:w-auto ${
                        selectedPlan.name === plan.name
                          ? "bg-[#086373] text-white"
                          : "border border-blue-600 text-blue-600"
                      }`}
                    >
                      {selectedPlan.name === plan.name ? "Selected" : "Choose"}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <p className="text-sm mb-4">
              By purchasing, I agree to transloom{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Terms & Conditions
              </a>
              .
            </p>
            <button className="w-full bg-[#086373] text-white py-3 rounded font-semibold">
              Pay €{selectedPlan.price?.toFixed(2) || "Custom"}
            </button>
            <p className="text-sm text-center mt-4">
              <a href="#" className="text-blue-600 hover:underline">
                Have a coupon? Click here to enter your code.
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlanSelection;
