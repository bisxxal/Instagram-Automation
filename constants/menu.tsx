import { Contact } from "lucide-react";
import { AiTwotoneHome } from "react-icons/ai"; 
import { FaSalesforce } from "react-icons/fa";
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