import { MenuEntry } from '@pancakeswap-libs/uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: 'https://dynastycoin.io/',
  },
  {
    label: 'Trade',
    icon: 'TradeIcon',
    initialOpenState: true,
    items: [
      {
        label: 'Exchange',
        href: '/swap',
      },
      {
        label: 'Liquidity',
        href: '/pool',
      }
    ],
  },
  {
    label: 'Farms',
    icon: 'FarmIcon',
    href: 'https://dynastyswap.finance',
  },
  {
    label: 'Pools',
    icon: 'PoolIcon',
    href: 'https://dynastyswap.finance'
  },
  {
    label: 'More',
    icon: 'MoreIcon',
    items: [
      {
        label: 'Contact',
        href: 'mailto:support@dynastycoin.io',
      },
      // {
      //   label: 'Voting',
      //   href: 'https://voting.pancakeswap.finance',
      // },
      {
        label: 'Github',
        href: 'https://github.com/dynastycoin.io',
      },
      {
        label: 'Docs',
        href: 'https://doc.dynastycoin.io',
      },
      // {
      //   label: 'Blog',
      //   href: 'https://pancakeswap.medium.com',
      // },
      {
        label: 'Medium',
        href: 'https://medium.com/@dynastycoin.io',
      },
    ],
  },
]

export default config
