type Props = {
  htmlString: string
  className?: string
}
export default function HtmlRender({ htmlString, className }: Props) {
  return <div className={className} dangerouslySetInnerHTML={{ __html: htmlString }} />
}
