import { Crypt } from "./crypt.js";
export const GameSaves = {
    load: (key) => localStorage.getItem(key),
    save: (key, value) => localStorage.setItem(key, value),
    delete: (key) => localStorage.removeItem(key),
    loadJson: (key) => {
        const value = localStorage.getItem(key);
        if (!value)
            return null;
        return JSON.parse(Crypt.decodeBase64(Crypt.reverse(value)));
    },
    saveJson: (key, value) => GameSaves.save(key, Crypt.reverse(Crypt.encodeBase64(JSON.stringify(value)))),
    deleteAll: () => localStorage.clear()
};
export class GameSave {
    constructor(gameId) {
        this.gameId = gameId;
        const saves = GameSaves.loadJson(gameId);
        this.data = (saves != null) ? saves : {};
    }
    saveAll() {
        GameSaves.saveJson(this.gameId, this.data);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZXNhdmUuanMiLCJzb3VyY2VSb290IjoiamUtc3JjLyIsInNvdXJjZXMiOlsiYWR2YW5jZWQvZ2FtZXNhdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFlBQVksQ0FBQztBQUVuQyxNQUFNLENBQUMsTUFBTSxTQUFTLEdBQUc7SUFDckIsSUFBSSxFQUFFLENBQUMsR0FBVyxFQUFFLEVBQUUsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztJQUNoRCxJQUFJLEVBQUUsQ0FBQyxHQUFXLEVBQUUsS0FBYSxFQUFFLEVBQUUsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUM7SUFDdEUsTUFBTSxFQUFFLENBQUMsR0FBVyxFQUFFLEVBQUUsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQztJQUVyRCxRQUFRLEVBQUUsQ0FBQyxHQUFXLEVBQUUsRUFBRTtRQUN0QixNQUFNLEtBQUssR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxLQUFLO1lBQUUsT0FBTyxJQUFJLENBQUM7UUFDeEIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUNELFFBQVEsRUFBRSxDQUFDLEdBQVcsRUFBRSxLQUFVLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVwSCxTQUFTLEVBQUUsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRTtDQUMvQixDQUFDO0FBRVgsTUFBTSxPQUFPLFFBQVE7SUFHakIsWUFBcUIsTUFBYztRQUFkLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDL0IsTUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUM3QyxDQUFDO0lBRUQsT0FBTztRQUNILFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0MsQ0FBQztDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ3J5cHQgfSBmcm9tIFwiLi9jcnlwdC5qc1wiO1xyXG5cclxuZXhwb3J0IGNvbnN0IEdhbWVTYXZlcyA9IHtcclxuICAgIGxvYWQ6IChrZXk6IHN0cmluZykgPT4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KSxcclxuICAgIHNhdmU6IChrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZykgPT4gbG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCB2YWx1ZSksXHJcbiAgICBkZWxldGU6IChrZXk6IHN0cmluZykgPT4gbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KSxcclxuXHJcbiAgICBsb2FkSnNvbjogKGtleTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xyXG4gICAgICAgIGlmICghdmFsdWUpIHJldHVybiBudWxsO1xyXG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKENyeXB0LmRlY29kZUJhc2U2NChDcnlwdC5yZXZlcnNlKHZhbHVlKSkpO1xyXG4gICAgfSxcclxuICAgIHNhdmVKc29uOiAoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpID0+IEdhbWVTYXZlcy5zYXZlKGtleSwgQ3J5cHQucmV2ZXJzZShDcnlwdC5lbmNvZGVCYXNlNjQoSlNPTi5zdHJpbmdpZnkodmFsdWUpKSkpLFxyXG5cclxuICAgIGRlbGV0ZUFsbDogKCkgPT4gbG9jYWxTdG9yYWdlLmNsZWFyKClcclxufSBhcyBjb25zdDtcclxuXHJcbmV4cG9ydCBjbGFzcyBHYW1lU2F2ZTxUID0gYW55PiB7XHJcbiAgICBkYXRhOiBUO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGdhbWVJZDogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3Qgc2F2ZXMgPSBHYW1lU2F2ZXMubG9hZEpzb24oZ2FtZUlkKTtcclxuICAgICAgICB0aGlzLmRhdGEgPSAoc2F2ZXMgIT0gbnVsbCkgPyBzYXZlcyA6IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIHNhdmVBbGwoKSB7XHJcbiAgICAgICAgR2FtZVNhdmVzLnNhdmVKc29uKHRoaXMuZ2FtZUlkLCB0aGlzLmRhdGEpO1xyXG4gICAgfVxyXG59Il19