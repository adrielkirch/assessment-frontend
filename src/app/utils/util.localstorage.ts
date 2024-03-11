export class LocalStorageUtil {
  static getCurrentUserId(): string {
    const session =  this.getCurrentSession();
    return session['_id']
  }
  static getCurrentSession(): any {
    if (typeof localStorage === 'undefined') {
      console.error('localStorage is not available in this environment');
      return {};
    }
    const session =  localStorage.getItem("session") 
    if(!session) {
      return {}
    }
    return JSON.parse(session)
  }
}
