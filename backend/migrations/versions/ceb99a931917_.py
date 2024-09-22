"""empty message

Revision ID: ceb99a931917
Revises: 1630133afa72
Create Date: 2024-09-22 17:01:35.432724

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ceb99a931917'
down_revision = '1630133afa72'
branch_labels = None
depends_on = None


def upgrade():
    with op.batch_alter_table('themes', schema=None) as batch_op:
        batch_op.add_column(sa.Column('active', sa.Boolean(), nullable=False, server_default=sa.sql.expression.true()))

def downgrade():
    with op.batch_alter_table('themes', schema=None) as batch_op:
        batch_op.drop_column('active')


    # ### end Alembic commands ###
