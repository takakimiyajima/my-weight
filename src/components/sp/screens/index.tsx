import styled from 'styled-components'
import { WeightEntity } from '@/entities'
import { Header } from '@/components/sp/layouts/Header'

const Wrapper = styled.div`
  margin: 24px 0;
`

type ContainerProps = {
  weights: Array<WeightEntity>
}

type Props = {
  className?: string
} & ContainerProps



export const Component = ({ className, weights }: Props): JSX.Element => {
  if (!weights.length) {
    return <p>loading...</p>;
  }

  return (
    <>
      <Header />

      <div className={className}>
        <div className="weight-weekly-container">
          <div className="title">Body weight</div>
          <div className="shape">Body shape</div>
          <div className="weight">{weights[0].weight}<span className="kg">kg</span></div>

        </div>
      </div>

      <Wrapper>
        {weights.map((weight, index) => (
          <div key={index}>
            <p>{weight.weight}</p>
            <p>{weight.workOutDate}</p>
          </div>
        ))}
      </Wrapper>

      {/* <footer className="">
        <p>Powered by Takaki Miyajima</p>
      </footer> */}
    </>
  )
}

// TODO: 基本的にここはレイアウト関連のみのスタイルを充てる
const StyledComponent = styled(Component)`
  padding: 74px 20px 40px;

   > .weight-weekly-container {
    padding: 12px;
    color: ${(props) => props.theme.white};
    background: ${(props) => props.theme.orange};
    width: 100%;
    height: 250px;
    border-radius: 10px;

    > .title {
      font-size: 14px;
      font-weight: bold;
    }
    > .shape {
      font-size: 12px;
    }

    > .weight {
      text-align: center;
      font-size: 56px;
      > .kg {
        margin-left: 10px;
        font-size: 20px;
      }
    }
  }
`

export const SpScreen = (props: Props): JSX.Element => {
  return <StyledComponent {...props} />;
};

