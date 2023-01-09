import { buttonCopyLink } from '../../const/const';

buttonCopyLink.addEventListener('click', () => {
  navigator.clipboard
    .writeText(window.location.href)
    .then(() => {
      buttonCopyLink.innerText = 'Link copied!';
    })
    .catch((err) => {
      console.error('Error in copying link', err);
    });
  setTimeout(() => {
    buttonCopyLink.innerText = 'Copy link';
  }, 3000);
});
