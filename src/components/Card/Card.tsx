import cn from 'classnames';
import { CardProps } from '@components/Card/Card.props';
import styles from '@components/Card/Card.module.css';
import Button from '@components/Button/Button';
import XIcon from '@assets/svg/x.svg?react';
import EditIcon from '@assets/svg/edit.svg?react';

const Card = ({
    title,
    url,
    description,
    onRemove,
    onEdit,
}: CardProps): JSX.Element => {
    const logoUrl = `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${url}&size=32`;

    const logo = logoUrl
        ? <img className={styles.logo} src={logoUrl} alt={title} />
        : <span className={cn(styles.logo, styles.logoPlug)}></span>;

    return (
        <article className={styles.card}>
            <a
                className={styles.link}
                href={url}
                target='_blank'
            >
                <div className={styles.main}>
                    {logo}
                    <h2 className={styles.title}>{title}</h2>
                </div>
                <div className={styles.footer}>
                    <p>{description || title}</p>
                </div>
            </a>
            <div className={styles.buttons}>
                <Button
                    className={cn(styles.button, styles.edit)}
                    onClick={onEdit}
                    shape='square'
                >
                    <EditIcon />
                </Button>
                <Button
                    className={cn(styles.button, styles.remove)}
                    onClick={onRemove}
                    shape='square'
                >
                    <XIcon />
                </Button>
            </div>
        </article>
    )
}

export default Card;