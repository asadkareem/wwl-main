import React from 'react';
import Accordion from "./components/Accordion";
import {ExternalLinkIcon, DownloadIcon} from "@heroicons/react/solid";
import Layout from "./components/Layout";

const resources = [
  {
    title: 'How to Save Money on Groceries',
    url: 'https://workweeklunch.com/wp-content/uploads/2018/12/The-Workweek-Lunch-Guide-To-Saving-Money-On-Groceries.pdf',
    icon: ExternalLinkIcon,
  },
  {
    title: 'College Meal Prep Guide',
    url: 'https://workweeklunch.com/wp-content/uploads/2018/09/The-Workweek-Lunch-College-Meal-Prep-Guide.pdf',
    icon: ExternalLinkIcon,
  },
  {
    title: 'Updated Basic Pantry List',
    url: 'https://workweeklunch.com/wp-content/uploads/2020/03/The-Workweek-Lunch-Pantry-List-1.pdf',
    icon: ExternalLinkIcon,
  },
  {
    title: 'Meal Plan Template for 2',
    url: 'https://workweeklunch.com/wp-content/uploads/2018/10/Workweek-Lunch-Meal-Planner-For-Two.xlsx',
    icon: DownloadIcon,
  },
  {
    title: 'Basic Meal Planning Template',
    url: 'https://workweeklunch.com/wp-content/uploads/2019/07/Updated-Workweek-Lunch-Meal-Planner.xlsx',
    icon: DownloadIcon,
  }
]

const helpfulLinks = [
  {
    title: 'Master List of Healthy Snacks',
    url: 'https://workweeklunch.com/ultimate-guide-healthy-snacking/',
    icon: ExternalLinkIcon,
  },
  {
    title: 'What Meal Prep Containers to Buy',
    url: 'https://workweeklunch.com/meal-prep-containers-101/',
    icon: ExternalLinkIcon,
  },
  {
    title: 'Minimalist Kitchen Equipment',
    url: 'https://workweeklunch.com/minimalist-kitchen-equipment/',
    icon: ExternalLinkIcon,
  }
]

const faqs = [
  {
    question: 'How can I use the WWL Meal Prep Program?',
    answer: [
      {
        text: 'How To Use the New WWL Program on Desktop - 2021',
        url: 'https://workweeklunch.com/wwl-program-2021-guide/',
        icon: ExternalLinkIcon,
      },
      {
        text: 'How To use the New WWL Program on Mobile - 2021',
        url: 'https://workweeklunch.com/wwl-program-mobile-guide/',
        icon: ExternalLinkIcon,
      }
    ]
  },
  {
    question: 'How Can I Cancel My Subscription',
    answer: [
      {
        text: 'Open the menu on the top left and navigate to the "My Account" page. Click on the pink button that says "Manage Account". A new page will open with you profile information. Click on "Subscriptions" and then click on "disable auto-renew". You’ll receive an email confirmation that your subscription has been disabled with a prompt to send feedback about the program. We really appreciate what you have to say and take feedback seriously!',
      }
    ]
  },
  {
    question: 'How Can I re-join the WWL Meal Prep Program',
    answer: [
      {
        text: 'To rejoin, you can simply log in with your email and password. Then go to "account", then "manage subscriptions" and from there you can enable the WWL Meal Prep Program. You’ll see an option for a month-to-month subscription and a 6-month option.',
      }
    ]
  },
  {
    question: 'How do I update my Credit Card',
    answer: [
      {
        text: 'To update your credit card, open the menu on the top left and navigate to the "My Account" page. Click on the pink button that says "Manage Account". On the left, you\'ll see an "Update Card" link. You\'ll be able to update your card from there! We do not currently accept PayPal. We accept Google Pay and Apple Pay.',
      }
    ]
  },
  {
    question: 'How do I switch to a 6-month or yearly membership?',
    answer: [
      {
        text: 'To upgrade your membership, open the menu on the top left and navigate to the "My Account" page. Click on the pink button that says "Manage Account". On the menu, you\'ll see "Subscriptions" on the left. Click that. You can then select the plan you want to switch to!',
      }
    ]
  },
  {
    question: 'Am I allowed to share Workweek Lunch recipes that are exclusive to members, with non-members?',
    answer: [
      {
        text: 'You can screenshot or print recipes to share with friends, family and coworkers if they ask, but please make sure to tell them where the recipe came from and how awesome the WWL program is!',
      }
    ]
  },
]


const Faq = () => {
  return (
    <div className='mt-10 mx-2 md:mx-6 bg-wwlWhite p-0 sm:p-6 rounded-lg'>
      <Layout sectionTitle='Resources' items={resources}/>
      <Layout sectionTitle='Helpful Links' items={helpfulLinks}/>
      <div>
        <Accordion faqs={faqs}/>
      </div>
    </div>
  );
};

export default Faq;