import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type TechnicalImageItem = {
  image: StaticImageData;
  alt: string;
  label?: string;
  title?: string;
  text?: string;
  position?: string;
};

export function TechnicalBadge({ children }: { children: ReactNode }) {
  return (
    <span className="lt-eyebrow">
      <span aria-hidden="true" />
      {children}
    </span>
  );
}

export function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav className="lt-breadcrumb" aria-label="Pot po strani">
      <ol>
        <li>
          <Link href="/">Domov</Link>
        </li>
        {items.map((item, i) => (
          <li key={i}>
            {item.href ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function ActionLink({
  href = "/kontakt",
  children = "Pogovorimo se o projektu",
  secondary = false,
}: {
  href?: string;
  children?: ReactNode;
  secondary?: boolean;
}) {
  return (
    <Link
      className={secondary ? "lt-button lt-button-secondary" : "lt-button"}
      href={href}
    >
      {children}
      <ArrowUpRight size={17} aria-hidden="true" />
    </Link>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  visual,
  variant = "split",
  breadcrumb,
  action = "Pošljite povpraševanje",
  secondary,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  visual?: ReactNode;
  variant?: "split" | "editorial" | "product";
  breadcrumb: string;
  action?: string | false;
  secondary?: { href: string; label: string };
}) {
  return (
    <section className={`lt-hero lt-hero-${variant}`}>
      <div className="lt-container">
        <Breadcrumbs
          items={
            breadcrumb === "Storitve"
              ? [{ label: breadcrumb }]
              : [{ label: breadcrumb }]
          }
        />
        <div className="lt-hero-grid">
          <div className="lt-hero-copy">
            <TechnicalBadge>{eyebrow}</TechnicalBadge>
            <h1>{title}</h1>
            {description && <p className="lt-lead">{description}</p>}
            {action && (
              <div className="lt-actions">
                <ActionLink>{action}</ActionLink>
                {secondary && (
                  <ActionLink href={secondary.href} secondary>
                    {secondary.label}
                  </ActionLink>
                )}
              </div>
            )}
            {children}
          </div>
          {visual && <div className="lt-hero-visual">{visual}</div>}
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  text,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="lt-section-heading">
      {eyebrow && <TechnicalBadge>{eyebrow}</TechnicalBadge>}
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

export function TechnicalCard({
  index,
  title,
  children,
  href,
}: {
  index?: string;
  title: string;
  children: ReactNode;
  href?: string;
}) {
  return (
    <article className="lt-card">
      {index && <span className="lt-index">{index}</span>}
      <h3>{title}</h3>
      <div className="lt-card-copy">{children}</div>
      {href && (
        <Link className="lt-text-link" href={href}>
          Več o storitvi <ArrowRight size={16} aria-hidden="true" />
        </Link>
      )}
    </article>
  );
}

export function ProcessFlow({
  steps,
  vertical = false,
}: {
  steps: (string | { title: string; text: string })[];
  vertical?: boolean;
}) {
  return (
    <ol className={`lt-process ${vertical ? "lt-process-vertical" : ""}`}>
      {steps.map((step, index) => (
        <li key={index}>
          <span className="lt-step-number">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            {typeof step === "string" ? (
              <p>{step}</p>
            ) : (
              <>
                <h3>{step.title.replace(/^\d+\.\s*/, "")}</h3>
                <p>{step.text}</p>
              </>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

export function CapabilityGrid({ items }: { items: string[] }) {
  return (
    <ul className="lt-capabilities">
      {items.map((item, i) => (
        <li key={item}>
          <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
          {item}
        </li>
      ))}
    </ul>
  );
}

export function Metric({
  value,
  label,
  note,
}: {
  value: string;
  label: string;
  note?: string;
}) {
  return (
    <div className="lt-metric">
      <dt>{label}</dt>
      <dd>{value}</dd>
      {note && <dd className="lt-metric-note">{note}</dd>}
    </div>
  );
}

export function CTASection({
  title = "Vaš naslednji korak. Naša tehnična podpora.",
  text = "Pošljite model, osnovne mere ali opis uporabe. Skupaj določimo smiselno pot do izdelave.",
  action = "Predstavite projekt",
}: {
  title?: string;
  text?: string;
  action?: string;
}) {
  return (
    <section className="lt-container lt-cta-wrap">
      <div className="lt-cta-panel">
        <div>
          <TechnicalBadge>Od zahteve do izvedbe</TechnicalBadge>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <ActionLink>{action}</ActionLink>
      </div>
    </section>
  );
}

export function JumpNav({ items }: { items: { id: string; label: string }[] }) {
  return (
    <nav className="lt-jump" aria-label="Na tej strani">
      <div className="lt-container">
        <span>Na tej strani</span>
        {items.map((item) => (
          <a key={item.id} href={`#${item.id}`}>
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

export function TechnicalImage({
  image,
  alt,
  label,
  caption,
  priority = false,
  contain = false,
  position,
}: TechnicalImageItem & {
  caption?: string;
  priority?: boolean;
  contain?: boolean;
}) {
  return (
    <figure className={`lt-technical-image${contain ? " is-contain" : ""}`}>
      {label && <span className="lt-media-label">{label}</span>}
      <Image
        src={image}
        alt={alt}
        placeholder="blur"
        priority={priority}
        sizes="(max-width: 800px) 100vw, (max-width: 1200px) 50vw, 620px"
        style={position ? { objectPosition: position } : undefined}
      />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

export function ImageSequence({
  items,
  ariaLabel,
}: {
  items: TechnicalImageItem[];
  ariaLabel: string;
}) {
  return (
    <div className="lt-image-sequence" aria-label={ariaLabel}>
      {items.map((item, index) => (
        <article key={`${item.alt}-${index}`}>
          <TechnicalImage {...item} />
          <div className="lt-image-sequence-copy">
            <span className="lt-index">
              {String(index + 1).padStart(2, "0")}
            </span>
            {item.title && <h3>{item.title}</h3>}
            {item.text && <p>{item.text}</p>}
          </div>
        </article>
      ))}
    </div>
  );
}

export function EngineeringVisual({
  mode = "cad",
}: {
  mode?: "cad" | "scan" | "print" | "repair" | "prototype";
}) {
  const labels = {
    cad: ["CAD / RAZVOJ", "Geometrija → izvedba"],
    scan: ["SCAN / REKONSTRUKCIJA", "Zajem → urejen model"],
    print: ["FDM / FGF", "Model → funkcionalni del"],
    repair: ["REVERSE ENGINEERING", "Poškodba → nova geometrija"],
    prototype: ["RAZVOJNI CIKEL", "Zasnova → test → izboljšava"],
  };
  return (
    <figure className={`lt-drawing lt-drawing-${mode}`}>
      <div className="lt-drawing-top">
        <span>{labels[mode][0]}</span>
        <span>LAZTEK / ENGINEERING</span>
      </div>
      <svg
        viewBox="0 0 560 390"
        role="img"
        aria-label={`Shematski prikaz tehnične komponente: ${labels[mode][1]}`}
      >
        <g fill="none" stroke="currentColor" strokeWidth=".7" opacity=".12">
          {Array.from({ length: 12 }, (_, i) => (
            <path key={i} d={`M${i * 50} 0V390 M0 ${i * 40}H560`} />
          ))}
        </g>
        <g fill="none" stroke="#6298ac" strokeWidth="1" opacity=".5">
          <path
            d="M60 280L287 360L499 232 M60 280V120 M287 360v-62 M499 232V89"
            strokeDasharray="4 6"
          />
          <path d="M62 321L279 392 M517 110V232 M509 110h16 M509 232h16" />
          <path d="M35 55h24m-12-12v24 M492 326h24m-12-12v24" />
        </g>
        <g
          stroke="#76cad3"
          strokeWidth="1.5"
          strokeLinejoin="round"
          fill={mode === "scan" ? "none" : "#163746"}
        >
          <path d="M98 246L293 315L470 214L275 145Z" />
          <path d="M98 246v24l195 69v-24 M293 339l177-101v-24" fill="#0a2636" />
          <path
            d="M192 206V93l49-28 136 48v111l-43 25V139L241 106v117Z"
            fill={mode === "scan" ? "none" : "#214653"}
          />
          <path
            d="M192 93l142 46 43-26 M241 65v41 M241 106l-49-13 M334 249l-43-15V126"
            fill="none"
          />
          <ellipse
            cx="282"
            cy="125"
            rx="14"
            ry="23"
            transform="rotate(-17 282 125)"
            fill="#092432"
          />
          <ellipse cx="157" cy="247" rx="15" ry="8" fill="#092432" />
          <ellipse cx="289" cy="294" rx="15" ry="8" fill="#092432" />
          <ellipse cx="418" cy="221" rx="15" ry="8" fill="#092432" />
        </g>
        {mode === "scan" && (
          <g fill="#83d6dc">
            {Array.from({ length: 160 }, (_, i) => (
              <circle
                key={i}
                cx={110 + ((i * 43) % 342)}
                cy={130 + ((i * 31) % 163)}
                r="1.3"
                opacity={0.25 + (i % 4) * 0.18}
              />
            ))}
            <path
              d="M115 70v242M140 78v240"
              stroke="#83d6dc"
              strokeWidth="1"
              opacity=".6"
            />
          </g>
        )}
        {mode === "print" && (
          <g fill="none" stroke="#72ceda" opacity=".35">
            {Array.from({ length: 9 }, (_, i) => (
              <path
                key={i}
                d={`M192 ${110 + i * 10}l49 17M334 ${145 + i * 10}l43-25`}
              />
            ))}
            <path
              d="M305 13v27l-14 20h-22l-14-20V13M279 60v24"
              opacity="1"
              strokeWidth="2"
            />
          </g>
        )}
        {mode === "repair" && (
          <path
            d="M206 178l17-11 7 13 16-9 7 13 15-8"
            fill="none"
            stroke="#d5b58b"
            strokeWidth="3"
          />
        )}
        {mode === "prototype" && (
          <path
            d="M109 135C87 48 387 16 443 136m0 0-26-12m26 12 8-28"
            fill="none"
            stroke="#72ceda"
            strokeWidth="1.5"
            strokeDasharray="6 5"
          />
        )}
        <g fill="none" stroke="#83bbca" strokeWidth="1">
          <path d="M371 122l66-50h71 M147 247L78 205H34" />
          <circle cx="371" cy="122" r="3" />
          <circle cx="147" cy="247" r="3" />
        </g>
      </svg>
      <figcaption>
        <span>{labels[mode][1]}</span>
        <span>Shematski prikaz</span>
      </figcaption>
    </figure>
  );
}
