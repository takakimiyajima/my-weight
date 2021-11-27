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

const Component = ({ className, visible }: Props) => (
  <Drawer visible={visible}>
    <div className={className}>
      <dl>
        <dt>Menu</dt>
        <dd>
          <Link href='/profile' passHref>
            <a className="menuLink">Profile</a>
          </Link>
          <Link href='#' passHref>
            <p className="menuLink" onClick={() => signOut()}>Logout</p>
          </Link>
        </dd>
      </dl>
    </div>
  </Drawer>
)

const StyledComponent = styled(Component)`
  dl {
    dt {
      font-size: 14px;
      border-bottom: 1px solid ${(props) => props.theme.green};
      color: ${(props) => props.theme.green};
      font-weight: bold;
      height: 72px;
      line-height: 72px;
      overflow: hidden;
      padding: 0 20px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    dd {
      border-bottom: 1px solid ${(props) => props.theme.gray};
      height: 45px;
      line-height: 45px;
      padding: 0 34px;
      .menuLink {
        font-size: 14px;
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
