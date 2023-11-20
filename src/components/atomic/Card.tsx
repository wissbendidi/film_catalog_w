//create a card component with rounded borders of 12 px, 0 padding, 0 margin
import { PropsWithChildren } from "react"


interface CardProps extends PropsWithChildren{
  width?: string | number;
  height?: string | number;
}
export function Card({width, height, children}: CardProps){
  return (
    <div className="rounded-xl p-0 m-0" style={{width: width, height: height, border: '2px solid red'}}>
      {children}
    </div>
  )

}