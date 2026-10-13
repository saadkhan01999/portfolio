import { BrowserFrame, PhoneFrame } from '../ui/DeviceFrames';

// Positions for decorative cut-outs (e.g. dishes around Feather & Bone).
const FLOAT_SPOTS = [
  'left-[-4%] bottom-[-6%] w-[30%]',
  'right-[-3%] top-[-8%] w-[22%] [animation-delay:-2s]',
  'left-[38%] bottom-[-10%] w-[24%] [animation-delay:-4s]',
];

/**
 * Composition of a project's real screens: browser windows, phones and any
 * decorative cut-outs. Purely visual (screens are described in the case study).
 */
export default function ProjectVisual({ project, eager = false }) {
  const v = project.visual;
  if (!v) return null;
  const [front, back] = v.windows;

  if (!front && v.phones.length) {
    return (
      <div className="relative flex h-full items-center justify-center gap-[6%] px-[6%] py-[4%]">
        {v.phones.map((phone, i) => (
          <PhoneFrame
            key={phone.src}
            image={phone}
            eager={eager}
            className={`w-[38%] max-w-[15rem] ${i % 2 ? 'translate-y-[8%] rotate-[4deg]' : '-translate-y-[4%] -rotate-[4deg]'} float-slow`}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      {back && (
        <BrowserFrame
          image={back}
          label={v.domain}
          dark
          eager={eager}
          className="absolute right-0 top-0 w-[78%] opacity-90 [transform:translate(4%,-2%)_rotate(2deg)]"
          sizes="(min-width: 1024px) 560px, 70vw"
        />
      )}
      {front && (
        <BrowserFrame
          image={front}
          label={v.domain}
          dark
          eager={eager}
          className={`absolute ${back ? 'bottom-0 left-0 w-[86%]' : 'left-0 top-1/2 w-[88%] -translate-y-1/2'} transition-transform duration-500 group-hover:-translate-y-1`}
          sizes="(min-width: 1024px) 620px, 82vw"
        />
      )}
      {v.phones[0] && (
        <PhoneFrame
          image={v.phones[0]}
          eager={eager}
          className="absolute bottom-[2%] right-[2%] w-[24%] max-w-[11rem] transition-transform duration-500 group-hover:-translate-y-2"
        />
      )}
      {v.floating.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          aria-hidden="true"
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          width="420"
          height="420"
          className={`float-slow pointer-events-none absolute drop-shadow-[0_24px_30px_rgba(0,0,0,0.55)] ${FLOAT_SPOTS[i % FLOAT_SPOTS.length]}`}
        />
      ))}
    </div>
  );
}
