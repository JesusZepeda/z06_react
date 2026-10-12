import './Icon.css';

const Icon = ({ title, className, onClick, ...props }) => {
    if (onClick) {
        return (   // Render as clickable icon
            <button        
                title={title}
                aria-label={title}
                onClick={onClick}
                className="icon-button"
                {...props}
            >
                <i className={className} aria-hidden="true"></i>
            </button>
        );
    }
    else {
      return (  // Render as decorative icon
          <i
              title={title}
              aria-label={title}
              className={className}
              {...props}
          />
        );
    }
};

export default Icon;