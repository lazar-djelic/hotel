import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useUsers } from "../../api/users/getAll/useUsers";
import { useChangeRoles } from "../../api/users/changeRoles/useChangeRoles";
import { USER_ROLE } from "../../../config/enums";

const UsersPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { users, loading } = useUsers();
  const { mutate: changeRole, isPending } = useChangeRoles(navigate);

  const roleOptions = Object.entries(USER_ROLE).map(([key, value]) => ({
    value: value,
    label: key.charAt(0).toUpperCase() + key.slice(1),
  }));

  return (
    <div className="max-w-6xl mx-auto p-4 mt-8">
      <div className="mb-16 text-5xl font-semibold">{t("users.users")}</div>

      {loading && (
        <div className="text-center text-primary py-10">{t("loading")}</div>
      )}

      {!loading && users.length === 0 && (
        <>
          <div className="max-w-7xl mx-auto p-4 mt-8">
            <div className="text-center text-primary py-10">
              {t("users.nousers")}
            </div>
          </div>
        </>
      )}

      {users.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table table-lg w-full">
            <thead>
              <tr className="bg-base-300">
                <th>{t("users.email")}</th>
                <th>{t("users.role")}</th>
                <th>{t("users.name")}</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                return (
                  <tr
                    key={index}
                    onClick={() => {}}
                    className="cursor-pointer transition-all border-l-4
             border-l-blue-400
             bg-[rgba(96,165,250,0.08)] hover:bg-[rgba(96,165,250,0.12)]"
                  >
                    <td className="font-medium">{user.email}</td>
                    <td>
                      <select
                        value={user.role}
                        onChange={(e) =>
                          changeRole({
                            id: user._id,
                            role: e.target.value as any,
                          })
                        }
                        disabled={isPending}
                        className="select select-bordered select-sm"
                      >
                        {roleOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>{`${user.guest.fName} ${user.guest.lName}`}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
