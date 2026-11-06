import { motion } from 'framer-motion';
import { MapPin, BedDouble, Bath, Maximize, CalendarCheck } from 'lucide-react';
import Button from '../common/Button.jsx';
import PictureImage from '../common/PictureImage.jsx';
import { formatCurrency, formatArea } from '../../utils/format.js';
import useReducedMotion from '../../hooks/useReducedMotion.js';

function StatusBadge({ status }) {
  const dotClass = {
    Available: 'bg-emerald-500',
    'Under Offer': 'bg-amber-500',
    'Coming Soon': 'bg-sky-500',
    Sold: 'bg-rose-500',
  };
  const cls = {
    Available: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    'Under Offer': 'bg-amber-50 text-amber-800 border-amber-200',
    'Coming Soon': 'bg-sky-50 text-sky-800 border-sky-200',
    Sold: 'bg-rose-50 text-rose-800 border-rose-200',
  }[status] || 'bg-ivory text-charcoal border-charcoal/10';
  const dot = dotClass[status] || 'bg-charcoal/40';
  return (
    <span
      className={`text-[10px] uppercase tracking-label border px-2 py-1 inline-flex items-center gap-1.5 ${cls}`}
    >
      <span className={`inline-block w-1.5 h-1.5 rounded-full ${dot}`} aria-hidden="true" />
      {status}
    </span>
  );
}

const visualVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.05 },
};

function PropertyVisual({ property, className = '' }) {
  return (
    <motion.div
      className={`absolute inset-0 ${className}`}
      variants={visualVariants}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden="true"
    >
      <PictureImage
        base={property.imageBase}
        widths={[1200, 600]}
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        alt=""
        width={1200}
        height={900}
        loading="lazy"
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
}

export default function PropertyCard({ property, onFocus, onBlur, onKeyDown, schedule }) {
  const {
    name,
    location,
    type,
    price,
    currency,
    isFromPrice,
    bedrooms,
    bathrooms,
    livingArea,
    status,
  } = property;
  const totalBeds = bedrooms > 0 ? `${bedrooms} bed` : 'Commercial';
  const reduce = useReducedMotion();

  const MotionTag = reduce ? 'article' : motion.article;
  const motionProps = reduce
    ? {}
    : { initial: 'rest', whileHover: 'hover', whileTap: { transition: { duration: 0.15 } } };

  return (
    <MotionTag
      className="group flex flex-col bg-white border border-charcoal/10 shadow-card focus-within:shadow-lg transition-shadow duration-300"
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      tabIndex={-1}
      {...motionProps}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-charcoal/5">
        <PropertyVisual property={property} />
        <div className="absolute top-4 left-4">
          <StatusBadge status={status} />
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-ivory/90">
          <span className="text-[10px] uppercase tracking-label bg-charcoal/70 px-2 py-1">
            {type}
          </span>
        </div>
      </div>

      <div className="flex flex-col p-6 flex-1">
        <h3 className="font-serif text-2xl text-charcoal leading-tight">{name}</h3>
        <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-charcoal/60">
          <MapPin size={14} className="text-gold" aria-hidden="true" />
          {location}
        </p>

        <dl className="mt-5 grid grid-cols-3 gap-3 text-sm">
          <div className="flex flex-col gap-1">
            <dt className="text-[11px] uppercase tracking-label text-charcoal/50">Beds</dt>
            <dd className="inline-flex items-center gap-1.5 text-charcoal">
              <BedDouble size={16} className="text-gold" aria-hidden="true" />
              {totalBeds}
            </dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="text-[11px] uppercase tracking-label text-charcoal/50">Baths</dt>
            <dd className="inline-flex items-center gap-1.5 text-charcoal">
              <Bath size={16} className="text-gold" aria-hidden="true" />
              {bathrooms}
            </dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="text-[11px] uppercase tracking-label text-charcoal/50">Area</dt>
            <dd className="inline-flex items-center gap-1.5 text-charcoal">
              <Maximize size={16} className="text-gold" aria-hidden="true" />
              <span className="text-xs">{formatArea(livingArea)}</span>
            </dd>
          </div>
        </dl>

        <div className="mt-6 flex items-end justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-label text-charcoal/50">
              {isFromPrice ? 'From' : 'Listed'}
            </p>
            <p className="font-serif text-2xl text-charcoal">
              {formatCurrency(price, currency, { compact: true })}
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <Button
            as="a"
            href={`#properties-${property.id}`}
            data-property-cta="view"
            data-property-id={property.id}
            variant="outline"
            size="sm"
            className="w-full"
            aria-label={`View details for ${name}`}
          >
            View
          </Button>
          <Button
            as="button"
            type="button"
            data-property-cta="schedule"
            data-property-id={property.id}
            onClick={() => schedule(property)}
            variant="gold"
            size="sm"
            className="w-full"
            aria-label={`Schedule a viewing for ${name}`}
          >
            <CalendarCheck size={14} aria-hidden="true" /> Viewing
          </Button>
        </div>
      </div>
    </MotionTag>
  );
}
