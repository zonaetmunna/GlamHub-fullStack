"use client";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800">About Us</h2>
              <p className="mt-2 text-sm text-gray-500">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac
                suscipit urna. Nullam tempor nibh vitae consectetur volutpat.
              </p>
            </div>
            <div className="mt-6 space-y-6">
              <p className="text-base text-gray-700 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                hendrerit libero nec felis posuere, vel blandit neque finibus.
                Curabitur consequat, velit id vestibulum condimentum, risus enim
                finibus dui, ac tincidunt nunc mi nec leo. Nulla aliquam nisl
                sit amet neque feugiat, at vestibulum ligula finibus. Etiam
                fermentum bibendum neque vel aliquet. Nullam luctus interdum
                lectus id sagittis. Aliquam at quam malesuada, rhoncus leo et,
                laoreet odio. Nam non tortor fringilla, interdum metus in,
                efficitur leo.
              </p>
              <p className="text-base text-gray-700 leading-relaxed">
                Vestibulum vestibulum vulputate eros sed luctus. Sed fringilla
                lacinia eros, at convallis ligula. Aliquam sit amet tellus at
                risus hendrerit finibus ac a arcu. Duis quis nunc efficitur,
                ultrices est eu, faucibus nisl. Nulla facilisi. Nunc euismod,
                mauris id rutrum vulputate, mi orci volutpat ante, in bibendum
                mauris lacus eu ipsum. Suspendisse potenti. Curabitur quis nulla
                ante. Fusce vitae orci ipsum. Integer laoreet metus in lobortis
                aliquet.
              </p>
              <p className="text-base text-gray-700 leading-relaxed">
                Fusce vehicula posuere facilisis. Integer vitae tristique diam,
                at gravida leo. Etiam auctor urna a sollicitudin ullamcorper.
                Sed iaculis tortor eget mauris tincidunt, eget pretium nisi
                lacinia. Nam non velit at metus convallis volutpat eu in ipsum.
                In sit amet tristique lorem. Cras ac ligula sit amet metus
                hendrerit fringilla in eu purus.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
