import Image from 'next/image';

export const KeepLogo = () => {
  return (
    <div className="flex items-center gap-1">
      <Image
        className="h-10 w-10"
        width={40}
        height={40}
        src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"
        alt=""
        aria-hidden="true"
        role="presentation"
      />
      <span className="text-2xl font-semibold text-stone-500">Keep</span>
    </div>
  );
};