import styled from 'styled-components'
import { WeightEntity } from '@/entities'
import { Header } from '@/components/sp/layouts/Header'

// const Wrapper = styled.div`
//   margin: 24px 0;
// `

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
        <div className="sub-parameters">
          <div className="container">
            {/** BMI: 標準体重指数 */}
            <div className="title">BMI</div>
            <div className="shape">Obesity</div>
            <div className="weight">{weights[0].weight}<span className="kg">kg</span></div>
          </div>
          <div className="container">
            {/** SBW(standard body weight): 標準体重 */}
            <div className="title">SBW</div>
            <div className="shape">Body shape</div>
            <div className="weight">{weights[0].weight}<span className="kg">kg</span></div>
          </div>
        </div>
      </div>

      {/* <Wrapper>
        {weights.map((weight, index) => (
          <div key={index}>
            <p>{weight.weight}</p>
            <p>{weight.workOutDate}</p>
          </div>
        ))}
      </Wrapper> */}

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
    height: 300px;
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

  > .sub-parameters {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    margin: auto;

    > .container {
      margin-top: 20px;
      padding: 12px;
      border-radius: 10px;
      width: 48%;
      height: 160px;
      color: ${(props) => props.theme.white};
      background: ${(props) => props.theme.yellow};

      > .title {
        font-size: 14px;
        font-weight: bold;
      }

      > .shape {
        font-size: 12px;
      }

      > .weight {
        text-align: center;
        font-size: 40px;
        > .kg {
          margin-left: 10px;
          font-size: 20px;
        }
      }
    }
  }
`

// ${(props) => {
//   switch (props.pageType) {
//     case "top":
//       return `padding-top: 62px;`;
//     case "app_article":
//       return `padding-top: 0px;`;
//     case "other":
//       return `padding-top: 44px;`;
//   }
// }}

export const SpScreen = (props: Props): JSX.Element => {
  return <StyledComponent {...props} />;
};

