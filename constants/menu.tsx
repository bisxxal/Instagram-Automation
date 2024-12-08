import { Contact, SendIcon } from "lucide-react";
import { AiTwotoneHome } from "react-icons/ai"; 
import { FaBrain, FaInstagram, FaSalesforce } from "react-icons/fa";
import { IoMdAnalytics } from "react-icons/io"; 
import { IoIosRocket } from "react-icons/io"; 
import { IoSettingsOutline } from "react-icons/io5";
import { PiInstagramLogoDuotone, PiRocketDuotone } from "react-icons/pi";
import { v4 as uuid } from 'uuid'
  
  export type FieldProps = {
    label: string
    id: string
  }
  
  type SideBarProps = {
    icon: React.ReactNode
  } & FieldProps
  
  export const SIDEBAR_MENU: SideBarProps[] = [
    {
      id: uuid(),
      label: 'home',
      icon: <AiTwotoneHome  size={22}/>,
    },
    {
      id: uuid(),
      label: 'automations',
      icon: <IoMdAnalytics size={22}/>,
    },
    {
      id: uuid(),
      label: 'integrations',
      icon: <IoIosRocket size={22}/>,
    },
    {
      id: uuid(),
      label: 'settings',
      icon:<IoSettingsOutline size={22}/>,
    },
  ]
 
  
  export const PAGE_BREAD_CRUMBS: string[] = [
    'contacts',
    'automations',
    'integrations',
    'settings',
  ]
  
  type Props = {
    [page in string]: React.ReactNode
  }
  
  export const PAGE_ICON: Props = {
    AUTOMATIONS: <IoMdAnalytics size={22}/>,
    CONTACTS: <Contact />,
    INTEGRATIONS: <PiRocketDuotone />,
    SETTINGS:<IoSettingsOutline size={22}/>,
    HOME: <AiTwotoneHome  fill="#273C95" size={22}/>,
  }
  
  export const PLANS = [
    {
      name: 'Free Plan',
      description: 'Perfect for getting started',
      price: '$0',
      features: [
        'Boost engagement with target responses',
        'Automate comment replies to enhance audience interaction',
        'Turn followers into customers with targeted messaging',
      ],
      cta: 'Get Started',
    },
    {
      name: 'Smart AI Plan',
      description: 'Advanced features for power users',
      price: '$99',
      features: [
        'All features from Free Plan',
        'AI-powered response generation',
        'Advanced analytics and insights',
        'Priority customer support',
        'Custom branding options',
      ],
      cta: 'Upgrade Now',
    },
  ]
 
type PropsForInte = {
  title: string
  icon: React.ReactNode
  description: string
  strategy: 'INSTAGRAM' | 'CRM'
}

export const INTEGRATION_CARDS: PropsForInte[] = [
  {
    title: 'Connect Instagram',
    description:
      'Lorem ipsum dolor sit amet consectetur. Mauris scelerisque tincidunt ultrices',
    icon: <PiInstagramLogoDuotone size={26} fill="#3352CC" />,
    strategy: 'INSTAGRAM',
    
  },
  {
    title: 'Connect Salesforce',
    description:
      'Lorem ipsum dolor sit amet consectetur. Mauris scelerisque tincidunt ultrices',
    icon: <FaSalesforce  size={26} fill="#3352CC" />,
    strategy: 'CRM',
  },
]
 
import { v4 } from 'uuid'

export type AutomationListenerProps = {
  id: string
  label: string
  icon: JSX.Element
  description: string
  type: 'SMARTAI' | 'MESSAGE'
}
export type AutomationsTriggerProps = {
  id: string
  label: string
  icon: JSX.Element
  description: string
  type: 'COMMENT' | 'DM'
}

export const AUTOMATION_TRIGGERS: AutomationsTriggerProps[] = [ 
  {
    id: v4(),
    label: 'User comments on my post',
    icon: <FaInstagram fill="#2E44A4" size={22} />,
    description: 'Select if you want to automate comments on your post',
    type: 'COMMENT',
  },
  {
    id: v4(),
    label: 'User sends me a dm with a keyword',
    icon: <FaInstagram  fill="#2E44A4" size={22}/>,
    description: 'Select if you want to automate DMs on your profile',
    type: 'DM',
  },
]

export const AUTOMATION_LISTENERS: AutomationListenerProps[] = [
  {
    id: v4(),
    label: 'Send the user a message',
    icon: <SendIcon />,
    description: 'Enter the message that you want to send the user.',
    type: 'MESSAGE',
  },
  {
    id: v4(),
    label: 'Let Smart AI take over',
    icon:<FaBrain />,
    description: 'Tell AI about your project. (Upgrade to use this feature)',
    type: 'SMARTAI',
  },
]

 

type Propsd = {
  id: string
  label: string
  subLabel: string
  description: string
}

export const DASHBOARD_CARDS: Propsd[] = [
  {
    id: v4(),
    label: 'Set-up Auto Replies',
    subLabel: 'Deliver a product lineup through Instagram DM',
    description: 'Get products in front of your followers in as many places',
  },
  {
    id: v4(),
    label: 'Answer Questions with AI',
    subLabel: 'Identify and respond to queries with AI',
    description: 'The intention of the message will be automatically detected',
  },
  {
    id: v4(),
    label: 'Answer Questions with AI',
    subLabel: 'Identify and respond to queries with AI',
    description: 'The intention of the message will be automatically detected',
  },
]