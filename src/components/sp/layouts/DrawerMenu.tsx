import { useRouter } from 'next/router'
import Link from 'next/link'
import styled from 'styled-components'
import { signOut } from 'next-auth/client'
import { Drawer } from '@/components/sp/layouts'

type ContainerProps = {
  visible: boolean
}

type Props = {
  className?: string
} & ContainerProps

type Menu = {
  path: string
  text: string
}

const menus: Array<Menu> = [
  {
    path: '/',
    text: 'Top',
  },
  {
    path: '/profile',
    text: 'Profile',
  },
]

const Component = ({ className, visible }: Props) => {
  const { pathname } = useRouter()

  return (
    <Drawer visible={visible}>
      <div className={className}>
        <dl>
          <dt>Menu</dt>
          <dd>
            {menus.map(({ path, text }, index) => (
              path !== pathname && 
                <Link href={path} passHref key={`menu-${index}`} as={path}>
                  <a className="menuLink">{text}</a>
                </Link>
            ))}
            <Link href="#" passHref>
              <p className="menuLink" onClick={() => signOut()}>
                Logout
              </p>
            </Link>
          </dd>
        </dl>
      </div>
    </Drawer>
  )
}

const StyledComponent = styled(Component)`
  dl {
    font-weight: bold;

    dt {
      font-size: 16px;
      border-bottom: 1px solid ${(props) => props.theme.green};
      color: ${(props) => props.theme.green};
      height: 72px;
      line-height: 72px;
      overflow: hidden;
      padding: 0 20px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    dd {
      font-size: 14px;
      line-height: 60px;

      .menuLink {
        border-bottom: 1px solid ${(props) => props.theme.green};
        background-size: 14px 13px;
        color: ${(props) => props.theme.green};
        display: flex;
        justify-content: space-between;
        align-items: center;
        overflow: hidden;
        padding-right: 20px;
        position: relative;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
`

export const DrawerMenu = (props: ContainerProps): JSX.Element => {
  return <StyledComponent {...props} />
}
