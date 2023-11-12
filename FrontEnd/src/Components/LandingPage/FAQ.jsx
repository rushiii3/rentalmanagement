import React from "react";

const FAQ = () => {
  const faq1 = [
    {
      question: "How do I onboard new tenants?",
      answer:
        "Our platform makes onboarding a breeze with easy-to-follow, step-by-step instructions.",
    },
    {
      question: "What payment processing options are available?",
      answer:
        "We support various payment methods, including credit card, eCheck, and direct deposit.",
    },
    {
      question: "How do I search for rental properties online?",
      answer:
        "You can use filters such as location, budget, and amenities to narrow down your options.",
    },
    {
      question:
        "What information should I gather before renting a house online?",
      answer:
        "Collect details like the rental price, lease terms, security deposit, utility costs, and any specific requirements or restrictions from the landlord.",
    },
    {
      question: "Can I negotiate the rent or lease terms?",
      answer:
        "In some cases, landlords may be open to negotiations, especially if the property has been on the market for a while. It's worth asking, but be respectful and reasonable in your negotiations.",
    },
    {
      question:
        "How is maintenance and repairs handled in the rental property?",
      answer:
        "Clarify the process for reporting and addressing maintenance issues. Understand who is responsible for repairs and how quickly they will be addressed.",
    },
  ];
  const faq2 = [
    {
      question: "How secure is your platform?",
      answer:
        "We prioritize security with robust data encryption and adhere to industry compliance standards.",
    },
    {
      question: "Can I integrate with other tools?",
      answer:
        "Yes, our API allows for seamless integration with popular property management tools.",
    },
    {
      question: "How can I ensure the legitimacy of an online rental listing?",
      answer:
        "Look for verified listings on reputable rental websites. Verify the landlord's identity and never send money without confirming the legitimacy of the rental.",
    },
    {
      question: "What is the typical rental application process?",
      answer:
        "The process often involves submitting an application form, providing references, undergoing a credit check, and sometimes attending a property viewing. Each landlord or property manager may have a slightly different process.",
    },
    {
      question:
        "Are there any additional fees besides rent and security deposit?",
      answer:
        "Some rentals may have additional fees such as maintenance fees, homeowners association (HOA) fees, or application fees. Clarify these details before committing to a rental.",
    },
    {
      question:
        "How are security deposits handled, and when can I expect it to be returned?",
      answer:
        "Understand the terms regarding the security deposit, including the amount, conditions for its return, and the timeline for the return after the lease ends.",
    },
  ];
  return (
    <div>
      <section class="bg-white dark:bg-gray-900">
        <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
          <h2 class="mb-8 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Frequently asked questions
          </h2>
          <div class="grid pt-8 text-left border-t border-gray-200 md:gap-16 dark:border-gray-700 md:grid-cols-2">
            <div>
              {faq1.map((values, key) => (
                <FAQsection question={values.question} answer={values.answer} />
              ))}
            </div>
            <div>
              {faq2.map((values, key) => (
                <FAQsection question={values.question} answer={values.answer} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;

export const FAQsection = (props) => {
  return (
    <div class="mb-10">
      <h3 class="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
        <svg
          class="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
            clip-rule="evenodd"
          ></path>
        </svg>
        {props.question}
      </h3>
      <p class="text-gray-500 dark:text-gray-400">{props.answer}</p>
    </div>
  );
};
