import github from '../assets/github-mark.svg'

export function Footer() {
  return (
    <div class="flex justify-center w-full pb-12">
      <a
        href="https://github.com/dylanclaywell/get-productive"
        class="max-w-[2rem] max-h-[2rem]"
      >
        <img src={github} alt="Get Productive Github Repository"></img>
      </a>
    </div>
  )
}
