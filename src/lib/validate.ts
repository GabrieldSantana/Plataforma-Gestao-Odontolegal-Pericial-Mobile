export const validarFormato = (uri: string): boolean => {
    const extensao = uri.split('.').pop()?.toLowerCase();
    return ['jpg', 'jpeg', 'png'].includes(extensao || '');
  };
  