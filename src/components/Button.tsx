export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (
  args
) => {
  return (
    <button className="rounded-full bg-pink-600 px-4 py-1" {...args}></button>
  )
}
