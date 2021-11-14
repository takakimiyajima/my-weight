// import styled from 'styled-components'
import { WeightEntity } from '@/entities'
import { Header } from '@/components/sp/layouts/Header'

// const Wrapper = styled.div`
//   margin: 24px 0;
// `

// const OutSideWrapper = styled.div`
//   margin: 0 -16px 16px;
// `

type Props = {
  weights: Array<WeightEntity>
}

export const SpScreen = ({ weights }: Props): JSX.Element => {
  return (
    <>
      <Header />

      {weights.map((weight, index) => (
        <div key={index}>
          <p>{weight.weight}</p>
          <p>{weight.workOutDate}</p>
        </div>
      ))}

      <footer className="">
        <p>Powered by Takaki Miyajima</p>
      </footer>
    </>
  )
}
