import { m } from 'framer-motion';
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
 * `parallax` optionally holds motion values ({ back, front, phone }) that move
 * each layer at its own speed as the panel scrolls in.
 */
export default function ProjectVisual({ project, eager = false, parallax }) {
  const v = project.visual;
  if (!v) return null;
  const [front, back] = v.windows;

  if (!front && v.phones.length) {
    return (
      <div className="relative flex h-full items-center justify-center gap-[6%] px-[6%] py-[4%]">
        {v.phones.map((phone, i) => (
          <m.div key={phone.src} style={{ y: i % 2 ? parallax?.front : parallax?.back }} className="w-[38%] max-w-[15rem]">
            <PhoneFrame
              image={phone}
              eager={eager}
              className={`${i % 2 ? 'translate-y-[8%] rotate-[4deg]' : '-translate-y-[4%] -rotate-[4deg]'} float-slow`}
            />
          </m.div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      {back && (
        <m.div style={{ y: parallax?.back }} className="absolute right-0 top-0 w-[78%]">
          <BrowserFrame
            image={back}
            label={v.domain}
            dark
            eager={eager}
            className="opacity-90 [transform:translate(4%,-2%)_rotate(2deg)]"
            sizes="(min-width: 1024px) 560px, 70vw"
          />
        </m.div>
      )}
      {front && (
        <m.div style={{ y: parallax?.front }} className={`absolute left-0 ${back ? 'bottom-0 w-[86%]' : 'top-1/2 w-[88%]'}`}>
          {/* Centring lives on an inner element so the parallax transform can't override it. */}
          <div className={back ? '' : '-translate-y-1/2'}>
            <BrowserFrame
              image={front}
              label={v.domain}
              dark
              eager={eager}
              className="transition-transform duration-500 ease-out group-hover:-translate-y-1.5"
              sizes="(min-width: 1024px) 620px, 82vw"
            />
          </div>
        </m.div>
      )}
      {v.phones[0] && (
        <m.div style={{ y: parallax?.phone }} className="absolute bottom-[2%] right-[2%] w-[24%] max-w-[11rem]">
          <PhoneFrame image={v.phones[0]} eager={eager} className="transition-transform duration-500 ease-out group-hover:-translate-y-3 group-hover:rotate-[-2deg]" />
        </m.div>
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
