import Button from '../ui/button';
import DateIcon from '../icons/date-icon';
import AddressIcon from '../icons/address-icon';
import ArrowRightIcon from '../icons/arrow-right-icon';
import classes from './event-item.module.css';
import Image from 'next/image';
import client from '../../src/app/lib/sanity';
import { getImageDimensions } from '@sanity/asset-utils'
import { urlFor } from '../../src/app/lib/urlFor'
import { useNextSanityImage } from 'next-sanity-image';


function EventItem(props) {
  const imageProps = useNextSanityImage(client)
  const { title, image, date, location, id } = props;

  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const formattedAddress = location.replace(', ', '\n');
  const exploreLink = `/events/${id}`;
  console.log(imageProps)
  return (
    <li className={classes.item}>
      <Image 
      src={urlFor(image).url()}
      alt={title}
      // width={getImageDimensions(image).width}
      // height={getImageDimensions(image).height}
      width={244}
      height={244}
      placeholder="blur"
      blurDataURL={urlFor(image).width(24).height(24).blur(10).url()}
      sizes="
        (max-width: 768px) 100vw,
        (max-width: 1200px) 50vw,
        40vw" 
      />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{humanReadableDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Button link={exploreLink}>
            <span>Explore Event</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
}

export default EventItem;
