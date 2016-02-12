import Relay from 'react-relay'

import Config from '../Config';
import UploadPictureMutation from '../mutations/UploadPictureMutation';

Motion.decorateView('Upload', (Upload) =>
  Relay.createContainer(Upload, {
    fragments: {
      // We request first picture here so that we always have a client-side
      // connection cache to add uploaded picture to
      viewer: () => Relay.QL`
        fragment on ReindexViewer {
          ${UploadPictureMutation.getFragment('viewer')}
          user {
            pictures(first: 1) {
              edges {
                node {
                  id
                  uploadCareId
                }
              }
            }
          }
          allPictures(orderBy: CREATED_AT_DESC, first: 1) {
            edges {
              node {
                id
                uploadCareId
              }
            }
          }
        }
      `,
    },
  })
)

view Upload {
  prop viewer
  let file
  let uploading = false

  const handleFileChange = (e) => {
    file = e.target.files[0];
  }

  const handleUpload = () => {
    if (file) {
      uploading = true;
      setTimeout(async () => {
        const form = new FormData();
        form.append('UPLOADCARE_PUB_KEY', Config.UPLOADCARE_PUBLIC_KEY);
        form.append('UPLOADCARE_STORE', '1')
        form.append('image', file, file.name);
        const response = await fetch('https://upload.uploadcare.com/base/', {
          method: 'POST',
          body: form,
        })
        const result = await response.json();
        Relay.Store.commitUpdate(new UploadPictureMutation({
          uploadCareId: result.image,
          viewer: viewer,
        }), {
          onFailure: () => {
            alert('error')
            uploading = false
          },
          onSuccess: (response) => {
            uploading = false
            Motion.router.go(
              `/picture/${response.createPicture.changedPictureEdge.node.id}`
            );
          },
        });
      });
    }
  }

  <div>Upload</div>
  <input if={!uploading} type="file" onChange={handleFileChange}/>
  <button if={!uploading} disabled={!file} onClick={handleUpload}>
    Upload
  </button>
  <loading if={uploading}>Uploading...</loading>

  $ = {
    margin: 'auto'
  }
}
