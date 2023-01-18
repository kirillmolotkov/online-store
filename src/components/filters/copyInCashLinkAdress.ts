import { buttonCopyLink, MESSAGE_DELETION_TIME } from '../../const/const';

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
  }, MESSAGE_DELETION_TIME);
});
