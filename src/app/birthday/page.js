import BirthdayExperience from "@/components/BirthdayExperience"

export default function Page() {
  return (
    <main
      className=" min-h-screen w-full flex flex-col items-center justify-start sm:justify-center px-4 py-6 sm:px-6 md:px-8 bg-gradient-to-br from-pink-200 via-purple-200 to-yellow-200 overflow-x-hidden overflow-y-auto"
    >
      <div
        className=" w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl"
      >
        <BirthdayExperience />
      </div>
    </main>
  )
}